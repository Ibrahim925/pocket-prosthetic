//
//  Endpoints.swift
//  pocket-prosthetic-app
//
//  Created by Ibrahim Khawar on 2024-08-03.
//

import Foundation

enum Endpoint {
	var 
	
	private var url: URL? {
		var components = URLComponents()
		
		components.scheme = "http"
		components.host = ProcessInfo.processInfo.environment["API_URL"]
		components.path
		
		return components.url
	}
}
