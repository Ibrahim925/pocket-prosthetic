//
//  pocket_prosthetic_appApp.swift
//  pocket-prosthetic-app
//
//  Created by Ibrahim Khawar on 2024-08-03.
//

import SwiftUI
import ARKit

@main
struct pocket_prosthetic_appApp: App {
	@UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

class AppDelegate: NSObject, UIApplicationDelegate {
	func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
		if !ARWorldTrackingConfiguration.supportsFrameSemantics(.sceneDepth) {
			print("Device does not support Lidar scanning!")
		}
		
		return true
	}
}
