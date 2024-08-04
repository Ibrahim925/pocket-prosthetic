//
//  LogInView.swift
//  pocket-prosthetic-app
//
//  Created by Ibrahim Khawar on 2024-08-03.
//

import SwiftUI

struct LogInView: View {
	@State private var email: String = ""
	@State private var password: String = ""
	@State private var wrongEmail = 0
	@State private var wrongPassword = 0
	
    var body: some View {
		NavigationView {
			ZStack {
				Color.blue.ignoresSafeArea()
				Circle().scale(1.7).foregroundColor(.white.opacity(0.15))
				Circle().scale(1.35).foregroundColor(.white)
				
				VStack {
					Text("Login").font(.largeTitle).bold().padding()
					TextField("Email", text: $email)
						.padding()
						.frame(width: 300, height: 50)
						.background(Color.black.opacity(0.05))
						.cornerRadius(10)
						.border(.red, width: CGFloat(wrongEmail))
					
					SecureField("Password", text: $password)
						.padding()
						.frame(width: 300, height: 50)
						.background(Color.black.opacity(0.05))
						.cornerRadius(10)
						.border(.red, width: CGFloat(wrongPassword))
					
					Button("Login") {
						
					}
					.foregroundColor(.white)
					.frame(width: 300, height: 50)
					.background(Color.blue)
					.cornerRadius(10)
					
					NavigationLink(
				}
			}
			.navigationBarHidden(true)
		}
    }
}

#Preview {
    LogInView()
}
