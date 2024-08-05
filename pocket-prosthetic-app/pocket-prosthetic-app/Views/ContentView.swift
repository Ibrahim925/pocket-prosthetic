//
//  ContentView.swift
//  pocket-prosthetic-app
//
//  Created by Ibrahim Khawar on 2024-08-04.
//

import SwiftUI

struct ContentView: View {
	@EnvironmentObject var globalState: GlobalState

	var body: some View {
		TabView {
//			HomeView()
//				.tabItem {
//					Label("Home", systemImage: "house")
//				}
//
//			if globalState.user?.type == "EMPLOYEE" || globalState.user?.type == "ADMIN" {
//				PatientsView()
//					.tabItem {
//						Label("Patients", systemImage: "person")
//					}
//			}
			
			RequestsView()
				.tabItem {
					Label("Requests", systemImage: "arrowshape.zigzag.right")
				}
			
			LogInView()
				.tabItem { Label("Log Out", systemImage: "arrowshape.turn.up.left.fill") }
		}
		.accentColor(.blue)
		.navigationBarBackButtonHidden(true)
	}
}
