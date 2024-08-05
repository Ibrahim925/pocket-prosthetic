import SwiftUI

struct LogInView: View {
	@EnvironmentObject var globalState: GlobalState
	@State private var email: String = ""
	@State private var password: String = ""
	@State private var errorMessage: String? = nil
	@State private var errorLocation: String? = nil

	let errorMessageHeight: CGFloat = 20 // Height reserved for error messages

	var body: some View {
		NavigationView {
			ZStack {
				// Background and decoration
				Color.blue.ignoresSafeArea()
				Circle().scale(1.7).foregroundColor(.white.opacity(0.15))
				Circle().scale(1.35).foregroundColor(.white)
				
				VStack {
					Text("Login")
						.font(.largeTitle)
						.bold()
						.padding()
						.foregroundColor(.black) // Ensure visibility on background
					
					VStack(alignment: .leading, spacing: 16) { // Added spacing for better separation
						// Email TextField
						TextField("Email", text: $email)
							.padding()
							.frame(maxWidth: .infinity, minHeight: 50) // Use maxWidth for flexibility
							.background(Color.black.opacity(0.05))
							.cornerRadius(10)
							.border(errorLocation == "USER_EMAIL" ? Color.red : Color.clear, width: 1)
						
						Text(errorLocation == "USER_EMAIL" ? (errorMessage ?? "") : "")
							.font(.caption)
							.foregroundColor(.red)
							.frame(height: errorMessageHeight, alignment: .leading)
						
						// Password SecureField
						SecureField("Password", text: $password)
							.padding()
							.frame(maxWidth: .infinity, minHeight: 50) // Use maxWidth for flexibility
							.background(Color.black.opacity(0.05))
							.cornerRadius(10)
							.border(errorLocation == "USER_PASSWORD" ? Color.red : Color.clear, width: 1)
						
						Text(errorLocation == "USER_PASSWORD" ? (errorMessage ?? "") : "")
							.font(.caption)
							.foregroundColor(.red)
							.frame(height: errorMessageHeight, alignment: .leading)
					}
					.padding(.horizontal, 20) // Added horizontal padding for better layout on different devices

					// Login Button
					Button("Login") {
						errorMessage = nil
						errorLocation = nil
						
						login(email: email, password: password) { result in
							if let result = result, let error = result.error {
								errorLocation = result.location
								errorMessage = error
							} else {
								globalState.user = result?.user
								globalState.isLoggedIn = true // Update global state
							}
						}
					}
					.foregroundColor(.white)
					.frame(maxWidth: .infinity, minHeight: 50) // Use maxWidth for flexibility
					.background(Color.blue)
					.cornerRadius(10)
					.padding(.top, 20) // Added top padding for separation
					
					// NavigationLink using global state
					NavigationLink(
						destination: ContentView(),
						isActive: Binding(
							get: { globalState.isLoggedIn },
							set: { newValue in globalState.isLoggedIn = newValue }
						)
					) {
						EmptyView()
					}
				}
				.padding() // Padding around the main VStack
			}
			.navigationBarHidden(true)
		}
		.onAppear() {
			globalState.user = nil
			globalState.isLoggedIn = false
		}
	}
}

struct LogInView_Previews: PreviewProvider {
	static var previews: some View {
		LogInView().environmentObject(GlobalState())
	}
}
