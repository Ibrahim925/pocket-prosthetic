import SwiftUI

struct FormCreationView: View {
	var formId: Int
	
	@State private var fields: [Field] = []
	@State private var newFieldLabel: String = ""
	@State private var selectedFieldType: String = ""

	var body: some View {
		VStack {
			Button("Export Form") {
				downloadCSV(formId: formId) { result in
					print(result)
				}
			}
			
			List(fields) { field in
				HStack {
					Text(field.label)
					Spacer()
					Text(field.type)
				}
			}
			
			Divider()
			
			VStack {
				TextField("Enter field label", text: $newFieldLabel)
					.textFieldStyle(RoundedBorderTextFieldStyle())
					.padding()
				
				Picker("Select field type", selection: $selectedFieldType) {
					Text("TEXT").tag("TEXT")
					Text("SCAN").tag("SCAN")
					Text("IMAGE").tag("IMAGE")
				}
				.pickerStyle(SegmentedPickerStyle())
				.padding()
				
				Button(action: {
					createField(type: selectedFieldType, label: newFieldLabel) {
						newField in
						if let field = newField?.field {
							fields.append(field)
						}
					}
				}) {
					Text("Add Field")
						.padding()
						.background(Color.blue)
						.foregroundColor(.white)
						.cornerRadius(8)
				}
				.padding()
				
				// Example error message
				Text("Error: Something went wrong")
					.frame(maxWidth: .infinity, alignment: .leading) // Left-align only the error message
					.padding()
					.foregroundColor(.red)
			}
		}
		.onAppear() {
			fetchFormFields(formId: formId) { results in
				if let foundFields = results?.fields {
					fields = foundFields
				}
			}
		}
	}
}
