import SwiftUI

struct RequestCreationView: View {
	@EnvironmentObject var globalState: GlobalState
	@State private var toEmail: String = ""
	@State private var navigateToFormCreation: Bool = false
	@State private var newFormId: Int?

	var body: some View {
		NavigationView {
			VStack {
				TextField("To Email", text: $toEmail)
					.textFieldStyle(RoundedBorderTextFieldStyle())
					.padding()
				
				Button(action: {
					// Ensure fromEmail is safely unwrapped
					guard let fromEmail = globalState.user?.email, !fromEmail.isEmpty else {
						return
					}
					
					// Validate the toEmail input
					guard !toEmail.isEmpty else {
						return
					}
					
					// Create the request
					createRequest(toEmail: toEmail, fromEmail: fromEmail) { newRequest in
						if let newRequest = newRequest {
							if newRequest.error == nil {
								// Handle success
								newFormId = newRequest.newRequest?.form.id
								navigateToFormCreation = true
							}
						}
					}
				}) {
					Text("Create Request")
						.padding()
						.background(Color.blue)
						.foregroundColor(.white)
						.cornerRadius(8)
				}
				.padding()
				
				NavigationLink(
					destination: FormCreationView(formId: newFormId ?? 0),
					isActive: $navigateToFormCreation
				) {
					EmptyView()
				}
			}
			.padding()
		}
	}
}
