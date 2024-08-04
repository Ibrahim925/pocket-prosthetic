"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const form_model_1 = __importDefault(require("./form.model"));
const user_model_1 = __importDefault(require("./user.model"));
let Request = class Request extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Request.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, { onDelete: "CASCADE", eager: true }),
    __metadata("design:type", user_model_1.default)
], Request.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_model_1.default, { onDelete: "CASCADE", eager: true }),
    __metadata("design:type", user_model_1.default)
], Request.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => form_model_1.default, { eager: true, onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", form_model_1.default)
], Request.prototype, "form", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Request.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], Request.prototype, "updated_at", void 0);
Request = __decorate([
    (0, typeorm_1.Entity)()
], Request);
exports.default = Request;
//# sourceMappingURL=request.model.js.map