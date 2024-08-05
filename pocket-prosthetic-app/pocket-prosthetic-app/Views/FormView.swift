import SwiftUI
import UIKit

// MARK: - ImagePicker

struct ImagePicker: UIViewControllerRepresentable {
	@Binding var selectedImage: UIImage?
	var sourceType: UIImagePickerController.SourceType = .photoLibrary

	class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
		var parent: ImagePicker

		init(parent: ImagePicker) {
			self.parent = parent
		}

		func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
			if let image = info[.originalImage] as? UIImage {
				parent.selectedImage = image
			}
			picker.dismiss(animated: true)
		}

		func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
			picker.dismiss(animated: true)
		}
	}

	func makeCoordinator() -> Coordinator {
		Coordinator(parent: self)
	}

	func makeUIViewController(context: Context) -> UIImagePickerController {
		let picker = UIImagePickerController()
		picker.delegate = context.coordinator
		picker.sourceType = sourceType
		return picker
	}

	func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}
}

// MARK: - ImageUploadView

struct ImageUploadView: View {
	let label: String
	@State private var showImagePicker = false
	@State private var selectedImage: UIImage? = nil
	@State private var uploadStatus: String? = nil

	var body: some View {
		VStack(alignment: .leading) {
			Text(label)
				.font(.headline)
			Button(action: {
				showImagePicker = true
			}) {
				Text("Upload Image")
					.foregroundColor(.blue)
			}
			.sheet(isPresented: $showImagePicker) {
				ImagePicker(selectedImage: $selectedImage)
			}
			if let selectedImage = selectedImage {
				Image(uiImage: selectedImage)
					.resizable()
					.scaledToFit()
					.frame(height: 200)
			}
			if let status = uploadStatus {
				Text(status)
					.foregroundColor(.red)
			}
		}
		.padding()
		.onChange(of: selectedImage) { newImage in
			if let image = newImage {
				uploadImage(image)
			}
		}
	}

	private func uploadImage(_ image: UIImage) {
		guard let imageData = image.jpegData(compressionQuality: 0.8) else {
			uploadStatus = "Failed to convert image to data"
			return
		}
		
		uploadImageData(fieldId: 123, imageData: imageData) { success in
			if success {
				uploadStatus = "Image uploaded successfully"
			} else {
				uploadStatus = "Image upload failed"
			}
		}
	}
	
	private func uploadImageData(fieldId: Int, imageData: Data, completion: @escaping (Bool) -> Void) {
		guard let baseURL = ProcessInfo.processInfo.environment["API_URL"],
			  let url = URL(string: "\(baseURL)/form/field/\(fieldId)") else {
			print("Invalid URL")
			completion(false)
			return
		}
		
		var request = URLRequest(url: url)
		request.httpMethod = "POST"
		
		let boundary = UUID().uuidString
		request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
		
		var body = Data()
		body.append("--\(boundary)\r\n".data(using: .utf8)!)
		body.append("Content-Disposition: form-data; name=\"file\"; filename=\"image.jpg\"\r\n".data(using: .utf8)!)
		body.append("Content-Type: image/jpeg\r\n\r\n".data(using: .utf8)!)
		body.append(imageData)
		body.append("\r\n".data(using: .utf8)!)
		body.append("--\(boundary)--\r\n".data(using: .utf8)!)
		
		request.httpBody = body
		
		let task = URLSession.shared.dataTask(with: request) { data, response, error in
			if let error = error {
				print("Request error: \(error)")
				completion(false)
				return
			}
					
			guard let data = data else {
				print("No data received")
				completion(false)
				return
			}
			
			print(String(data: data, encoding: .utf8))
			completion(true)
		}
		
		task.resume()
	}
}

// MARK: - ScanDrawerView

struct ScanDrawerView: View {
	@Binding var submittedExportRequest: Bool
	@Binding var submittedName: String
	@Environment(\.presentationMode) var presentationMode
	var fieldId: Int

	var body: some View {
		VStack {
			ARViewWrapper(submittedExportRequest: $submittedExportRequest, submittedName: $submittedName)
			
			Button("Export") {
				submittedExportRequest = true
				uploadScan(fieldId: fieldId) { response in
					if response != nil {
						print("Scan uploaded successfully")
					} else {
						print("Scan upload failed")
					}
				}
			}
			
			Button("Close") {
				presentationMode.wrappedValue.dismiss()
			}
			.padding()
		}
	}
}

// MARK: - ScanView

struct ScanView: View {
	let label: String
	@State private var submittedExportRequest = false
	@State private var submittedName = "Scan"
	@State private var showScanDrawer = false
	var fieldId: Int

	var body: some View {
		VStack(alignment: .leading) {
			Text(label)
				.font(.headline)
			
			FetchModelView()
			
			HStack {
				Button("Start Scanning") {
					showScanDrawer = true
				}
				.sheet(isPresented: $showScanDrawer) {
					ScanDrawerView(submittedExportRequest: $submittedExportRequest, submittedName: $submittedName, fieldId: fieldId)
				}
			}
		}
		.padding()
	}
}

// MARK: - TextFieldView

struct TextFieldView: View {
	let label: String
	let fieldId: Int
	let formId: Int
	@State var value = ""
	
	var body: some View {
		VStack(alignment: .leading) {
			Text(label)
				.font(.headline)
			TextField("Enter \(label)", text: $value)
				.textFieldStyle(RoundedBorderTextFieldStyle())
			
			Button("Submit") {
				submitForm(formId: formId, fieldValues: [(id: fieldId, value: value)]) { response in
					print(response)
				}
			}
		}
		.padding()
	}
}

// MARK: - FormView

struct FormView: View {
	var formId: Int
	@State private var fields: [Field] = []

	var body: some View {
		VStack {
			ForEach(fields, id: \.id) { field in
				switch field.type {
				case "TEXT":
					TextFieldView(label: field.label, fieldId: field.id, formId: formId)
				case "SCAN":
					ScanView(label: field.label, fieldId: field.id)
				default:
					EmptyView()
				}
			}
		}
		.onAppear {
			fetchFormFields(formId: formId) { results in
				if let foundFields = results?.fields {
					fields = foundFields
				}
			}
		}
	}
}
