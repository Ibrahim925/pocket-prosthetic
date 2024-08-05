//
//  Field.swift
//  pocket-prosthetic-app
//
//  Created by Ibrahim Khawar on 2024-08-03.
//

import Foundation

struct Field: Codable, Identifiable {
	var id: Int
	var type: String
	var label: String
	var value: String
	var form: Form
	var created_at: String
	var updated_at: String
}
