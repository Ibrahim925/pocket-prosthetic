import Foundation

struct LoginRequest: Codable {
	let email: String
	let password: String
}

struct LoginResponse: Codable {
	let error: String?
	let location: String?
	let user: User?
}

func login(email: String, password: String, completion: @escaping (LoginResponse?) -> Void) {
	// Get the base URL from environment variables
	guard let baseURL = ProcessInfo.processInfo.environment["API_URL"],
		  let url = URL(string: "\(baseURL)/user/login") else {
		print("Invalid URL")
		completion(nil) // or handle the failure case as you see fit
		return
	}
	
	print(url)
	
	var request = URLRequest(url: url)
	request.httpMethod = "POST"
	request.setValue("application/json", forHTTPHeaderField: "Content-Type")
	
	// Create the request body
	let loginRequest = LoginRequest(email: email, password: password)
	guard let httpBody = try? JSONEncoder().encode(loginRequest) else {
		print("Failed to encode request body")
		completion(nil) // or handle the failure case as you see fit
		return
	}
	request.httpBody = httpBody
	
	// Create the URLSession task
	let task = URLSession.shared.dataTask(with: request) { data, response, error in
		if let error = error {
			print("Request error: \(error)")
			completion(nil) // or handle the error case differently
			return
		}
				
		guard let data = data else {
			print("No data received")
			completion(nil) // or handle the failure case as you see fit
			return
		}
						
		do {
			let loginResponse = try JSONDecoder().decode(LoginResponse.self, from: data)
			
			completion(loginResponse) // Pass the successful response to the callback
		} catch {
			print("Failed to decode response: \(error)")
			completion(nil) // or handle the error case as you see fit
		}
	}
	
	task.resume()
}

struct FetchRequestsResponse: Codable {
	let requests: [Request]
}

// Define the function to fetch requests
func fetchOutgoingRequests(for userId: Int, completion: @escaping (FetchRequestsResponse?) -> Void) {
	// Get the base URL from environment variables
	guard let baseURL = ProcessInfo.processInfo.environment["API_URL"],
		  let url = URL(string: "\(baseURL)/request/from/\(userId)") else {
		print("Invalid URL")
		completion(nil) // or handle the failure case as you see fit
		return
	}
	
	var request = URLRequest(url: url)
	request.httpMethod = "GET"
	request.setValue("application/json", forHTTPHeaderField: "Content-Type")
	
	// Create the URLSession task
	let task = URLSession.shared.dataTask(with: request) { data, response, error in
		if let error = error {
			print("Request error: \(error)")
			completion(nil) // or handle the error case differently
			return
		}
				
		guard let data = data else {
			print("No data received")
			completion(nil) // or handle the failure case as you see fit
			return
		}
						
		do {
			let requests = try JSONDecoder().decode(FetchRequestsResponse.self, from: data)
			completion(requests) // Pass the successful response to the callback
		} catch {
			print("Failed to decode response: \(error)")
			completion(nil) // or handle the error case as you see fit
		}
	}
	
	task.resume()
}

// Define the function to fetch requests
func fetchIncomingRequests(for userId: Int, completion: @escaping (FetchRequestsResponse?) -> Void) {
	// Get the base URL from environment variables
	guard let baseURL = ProcessInfo.processInfo.environment["API_URL"],
		  let url = URL(string: "\(baseURL)/request/to/\(userId)") else {
		print("Invalid URL")
		completion(nil) // or handle the failure case as you see fit
		return
	}
	
	var request = URLRequest(url: url)
	request.httpMethod = "GET"
	request.setValue("application/json", forHTTPHeaderField: "Content-Type")
	
	// Create the URLSession task
	let task = URLSession.shared.dataTask(with: request) { data, response, error in
		if let error = error {
			print("Request error: \(error)")
			completion(nil) // or handle the error case differently
			return
		}
				
		guard let data = data else {
			print("No data received")
			completion(nil) // or handle the failure case as you see fit
			return
		}
						
		do {
			let requests = try JSONDecoder().decode(FetchRequestsResponse.self, from: data)
			completion(requests) // Pass the successful response to the callback
		} catch {
			print("Failed to decode response: \(error)")
			completion(nil) // or handle the error case as you see fit
		}
	}
	
	task.resume()
}

struct FetchFormResponse: Codable {
	let form: Form
}

func fetchForm(formId: Int, completion: @escaping (FetchFormResponse?) -> Void) {
	// Get the base URL from environment variables
	guard let baseURL = ProcessInfo.processInfo.environment["API_URL"],
		  let url = URL(string: "\(baseURL)/form/\(formId)") else {
		print("Invalid URL")
		completion(nil)
		return
	}
	
	var request = URLRequest(url: url)
	request.httpMethod = "GET"
	request.setValue("application/json", forHTTPHeaderField: "Content-Type")
	
	// Create the URLSession task
	let task = URLSession.shared.dataTask(with: request) { data, response, error in
		if let error = error {
			print("Request error: \(error)")
			completion(nil)
			return
		}
		
		guard let data = data else {
			print("No data received")
			completion(nil)
			return
		}
		
		do {
			let form = try JSONDecoder().decode(FetchFormResponse.self, from: data)
			completion(form)
		} catch {
			print("Failed to decode response: \(error)")
			completion(nil)
		}
	}
	
	task.resume()
}

struct FetchFormFieldsResponse: Codable {
	let fields: [Field]
}

func fetchFormFields(formId: Int, completion: @escaping (FetchFormFieldsResponse?) -> Void) {
	// Get the base URL from environment variables
	guard let baseURL = ProcessInfo.processInfo.environment["API_URL"],
		  let url = URL(string: "\(baseURL)/form/\(formId)/field") else {
		print("Invalid URL")
		completion(nil)
		return
	}
	
	var request = URLRequest(url: url)
	request.httpMethod = "GET"
	request.setValue("application/json", forHTTPHeaderField: "Content-Type")
	
	// Create the URLSession task
	let task = URLSession.shared.dataTask(with: request) { data, response, error in
		if let error = error {
			print("Request error: \(error)")
			completion(nil)
			return
		}
		
		guard let data = data else {
			print("No data received")
			completion(nil)
			return
		}
		
		do {
			let fields = try JSONDecoder().decode(FetchFormFieldsResponse.self, from: data)
			completion(fields)
		} catch {
			print("Failed to decode response: \(error)")
			completion(nil)
		}
	}
	
	task.resume()
}

struct RequestCreationResponse: Codable {
	let error: String?
	let location: String?
	let newRequest: Request?
}

func createRequest(toEmail: String, fromEmail: String, completion: @escaping (RequestCreationResponse?) -> Void) {
	// Get the base URL from environment variables
	guard let baseURL = ProcessInfo.processInfo.environment["API_URL"],
		  let url = URL(string: "\(baseURL)/request") else {
		print("Invalid URL")
		completion(nil)
		return
	}
	
	var request = URLRequest(url: url)
	request.httpMethod = "POST"
	request.setValue("application/json", forHTTPHeaderField: "Content-Type")
	
	// Create the JSON payload
	let payload = ["toEmail": toEmail, "fromEmail": fromEmail]
	do {
		request.httpBody = try JSONSerialization.data(withJSONObject: payload, options: [])
	} catch {
		print("Failed to serialize JSON: \(error)")
		completion(nil)
		return
	}
		
	// Create the URLSession task
	let task = URLSession.shared.dataTask(with: request) { data, response, error in
		if let error = error {
			print("Request error: \(error)")
			completion(nil)
			return
		}
				
		guard let data = data else {
			print("No data received")
			completion(nil)
			return
		}
					
		do {
			let newRequest = try JSONDecoder().decode(RequestCreationResponse.self, from: data)
			completion(newRequest)
		} catch {
			print("Failed to decode response: \(error)")
			completion(nil)
		}
	}
	
	task.resume()
}

struct FieldCreationResponse: Codable {
	let field: Field
}

func createField(type: String, label: String, completion: @escaping (FieldCreationResponse?) -> Void) {
	// Get the base URL from environment variables
	guard let baseURL = ProcessInfo.processInfo.environment["API_URL"],
		  let url = URL(string: "\(baseURL)/form/field") else {
		print("Invalid URL")
		completion(nil)
		return
	}
	
	var request = URLRequest(url: url)
	request.httpMethod = "POST"
	request.setValue("application/json", forHTTPHeaderField: "Content-Type")
	
	// Create the JSON payload
	let payload = ["type": type, "label": label]
	do {
		request.httpBody = try JSONSerialization.data(withJSONObject: payload, options: [])
	} catch {
		print("Failed to serialize JSON: \(error)")
		completion(nil)
		return
	}
		
	// Create the URLSession task
	let task = URLSession.shared.dataTask(with: request) { data, response, error in
		if let error = error {
			print("Request error: \(error)")
			completion(nil)
			return
		}
				
		guard let data = data else {
			print("No data received")
			completion(nil)
			return
		}
		
		do {
			let newField = try JSONDecoder().decode(FieldCreationResponse.self, from: data)
			completion(newField)
		} catch {
			print("Failed to decode response: \(error)")
			completion(nil)
		}
	}
	
	task.resume()
}

func uploadScan(fieldId: Int, completion: @escaping (Data?) -> Void) {
	// Define the filename
	let fileName = "Scan.obj"
	
	// Get the documents directory URL
	guard let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first else {
		print("Failed to find documents directory")
		completion(nil)
		return
	}
	
	// Define the folder URL
	let folderURL = documentsDirectory.appendingPathComponent("OBJ_FILES")
	let fileURL = folderURL.appendingPathComponent(fileName)
	
	// Check if file exists
	guard FileManager.default.fileExists(atPath: fileURL.path) else {
		print("File \(fileName) not found")
		completion(nil)
		return
	}
	
	// Get the base URL from environment variables
	guard let baseURL = ProcessInfo.processInfo.environment["API_URL"],
		  let url = URL(string: "\(baseURL)/form/field/\(fieldId)") else {
		print("Invalid URL")
		completion(nil)
		return
	}
	
	var request = URLRequest(url: url)
	request.httpMethod = "PATCH" // or "PUT" depending on your API requirements
	
	// Create boundary string for multipart/form-data
	let boundary = UUID().uuidString
	request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
	
	// Create multipart/form-data body
	var body = Data()
	
	// Append the file data
	if let fileData = try? Data(contentsOf: fileURL) {
		body.append("--\(boundary)\r\n".data(using: .utf8)!)
		body.append("Content-Disposition: form-data; name=\"file\"; filename=\"\(fileName)\"\r\n".data(using: .utf8)!)
		body.append("Content-Type: application/octet-stream\r\n\r\n".data(using: .utf8)!)
		body.append(fileData)
		body.append("\r\n".data(using: .utf8)!)
	} else {
		print("Failed to read file data")
		completion(nil)
		return
	}
	
	// End the body with boundary
	body.append("--\(boundary)--\r\n".data(using: .utf8)!)
	
	request.httpBody = body
	
	// Create the URLSession task
	let task = URLSession.shared.dataTask(with: request) { data, response, error in
		if let error = error {
			print("Request error: \(error)")
			completion(nil)
			return
		}
				
		guard let data = data else {
			print("No data received")
			completion(nil)
			return
		}
		
		// Assuming the API returns a response to be processed
		completion(data)
	}
	
	task.resume()
}

struct FormSubmissionResponse: Codable {
	let form: Form
}

func submitForm(formId: Int, fieldValues: [(id: Int, value: String)], completion: @escaping (FormSubmissionResponse?) -> Void) {
	// Get the base URL from environment variables
	guard let baseURL = ProcessInfo.processInfo.environment["API_URL"],
		  let url = URL(string: "\(baseURL)/field/\(formId)") else {
		print("Invalid URL")
		completion(nil)
		return
	}
	
	var request = URLRequest(url: url)
	request.httpMethod = "POST"
	request.setValue("application/json", forHTTPHeaderField: "Content-Type")
	
	// Create the JSON payload
	let payload: [String: Any] = ["fieldValues": fieldValues.map { ["id": $0.id, "value": $0.value] }]
	do {
		request.httpBody = try JSONSerialization.data(withJSONObject: payload, options: [])
	} catch {
		print("Failed to serialize JSON: \(error)")
		completion(nil)
		return
	}
	
	// Create the URLSession task
	let task = URLSession.shared.dataTask(with: request) { data, response, error in
		if let error = error {
			print("Request error: \(error)")
			completion(nil)
			return
		}
		
		guard let data = data else {
			print("No data received")
			completion(nil)
			return
		}
		
		// Check if the response status is 200 OK
		if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
			do {
				// Decode the response into the FormSubmissionResponse model
				let formResponse = try JSONDecoder().decode(FormSubmissionResponse.self, from: data)
				completion(formResponse)
			} catch {
				print("Failed to decode response: \(error)")
				completion(nil)
			}
		} else {
			print("Failed to submit form")
			completion(nil)
		}
	}
	
	task.resume()
}



func downloadCSV(formId: Int, completion: @escaping (URL?) -> Void) {
	// Get the base URL from environment variables
	guard let baseURL = ProcessInfo.processInfo.environment["API_URL"],
		  let url = URL(string: "\(baseURL)/form/\(formId)/csv") else {
		print("Invalid URL")
		completion(nil)
		return
	}
	
	var request = URLRequest(url: url)
	request.httpMethod = "GET"
	request.setValue("application/json", forHTTPHeaderField: "Accept")
	
	// Create the URLSession task
	let task = URLSession.shared.dataTask(with: request) { data, response, error in
		if let error = error {
			print("Request error: \(error)")
			completion(nil)
			return
		}
		
		guard let data = data else {
			print("No data received")
			completion(nil)
			return
		}
		
		// Check if the response is a CSV file
		if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
			// Create a file URL in the document directory
			let fileManager = FileManager.default
			let documentsDirectory = fileManager.urls(for: .documentDirectory, in: .userDomainMask)[0]
			let fileURL = documentsDirectory.appendingPathComponent("form_\(formId).csv")
			
			do {
				// Write the data to the file
				try data.write(to: fileURL)
				completion(fileURL)
			} catch {
				print("Failed to save file: \(error)")
				completion(nil)
			}
		} else {
			print("Failed to download CSV")
			completion(nil)
		}
	}
	
	task.resume()
}

