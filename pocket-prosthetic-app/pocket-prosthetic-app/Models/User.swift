//
//  User.swift
//  pocket-prosthetic-app
//
//  Created by Ibrahim Khawar on 2024-08-03.
//

import Foundation

struct User: Codable {
	var id: Int;
	var first_name: String;
	var last_name: String;
	var email: String;
	var password: String;
	var activated: Bool;
	var type: String;
	var hospital: Hospital;
	var created_at: String;
	var updated_at: String;
}
