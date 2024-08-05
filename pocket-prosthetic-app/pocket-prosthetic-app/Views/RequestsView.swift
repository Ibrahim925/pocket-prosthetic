import SwiftUI

struct RequestComponent: View {
	var request: Request

	var body: some View {
		VStack(alignment: .leading, spacing: 8) {
			Text("Request ID: \(request.id)")
				.font(.headline)
			HStack {
				Text("From: \(request.from.email)")
					.font(.footnote)
				Spacer()
				Text("To: \(request.to.email)")
					.font(.footnote)
			}
		}
		.padding()
		.background(Color.gray.opacity(0.1))
		.cornerRadius(8)
		.shadow(radius: 4)
	}
}

struct RequestsView: View {
	@EnvironmentObject var globalState: GlobalState
	@State private var outgoingRequests: [Request] = []
	@State private var incomingRequests: [Request] = []
	@State private var showFormCreationView: Bool = false

	var body: some View {
		NavigationView {
			ScrollView {
				VStack(alignment: .leading, spacing: 16) {
					if globalState.user?.type != "PATIENT" {
						HStack {
							Text("Outgoing")
								.font(.largeTitle)
								.bold()
								.foregroundColor(.black)

							Spacer()

							NavigationLink(destination: RequestCreationView()) {
								Text("Add")
							}
						}
						.padding([.leading, .trailing])

						ForEach(outgoingRequests, id: \.id) { request in
							NavigationLink(destination: FormCreationView(formId: request.form.id)) {
								RequestComponent(request: request)
							}
						}
					}

					HStack {
						Text("Incoming")
							.font(.largeTitle)
							.bold()
							.foregroundColor(.black)
					}
					.padding([.leading, .trailing])

					ForEach(incomingRequests, id: \.id) { request in
						NavigationLink(destination: FormView(formId: request.form.id)) {
							RequestComponent(request: request)
						}
					}
				}
				.padding()
			}
			.onAppear {
				if let userId = globalState.user?.id {
					fetchOutgoingRequests(for: userId) { result in
						if let result = result {
							outgoingRequests = result.requests
						}
					}

					fetchIncomingRequests(for: userId) { result in
						if let result = result {
							incomingRequests = result.requests
						}
					}
				}
			}
		}
	}
}
