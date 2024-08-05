//
//  Feedback.swift
//  pocket-prosthetic-app
//
//  Created by Ibrahim Khawar on 2024-08-03.
//

import Foundation

struct Feedback: Codable {
	var id: Int
	var score: Int
	var notes: String
	var created_by: User
	var created_at: String
	var updated_at: String
}
