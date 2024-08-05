//
//  Request.swift
//  pocket-prosthetic-app
//
//  Created by Ibrahim Khawar on 2024-08-03.
//

import Foundation

struct Request: Codable {
	var id: Int
	var to: User
	var from: User
	var form: Form
	var created_at: String
	var updated_at: String
}
