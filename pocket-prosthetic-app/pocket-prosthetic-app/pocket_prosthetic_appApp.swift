import SwiftUI
import ARKit
import Combine

@main
struct pocket_prosthetic_appApp: App {
	@StateObject private var globalState = GlobalState()
	
	@UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
	
	var body: some Scene {
		WindowGroup {
			LogInView()
				.environmentObject(globalState)
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

class GlobalState: ObservableObject {
	@Published var user: User?
	@Published var isLoggedIn: Bool = false
}
