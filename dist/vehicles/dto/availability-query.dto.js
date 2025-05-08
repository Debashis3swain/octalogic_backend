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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityQueryDto = void 0;
const class_validator_1 = require("class-validator");
class AvailabilityQueryDto {
}
exports.AvailabilityQueryDto = AvailabilityQueryDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Start date is required' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Start date must be a valid date string (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], AvailabilityQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'End date is required' }),
    (0, class_validator_1.IsDateString)({}, { message: 'End date must be a valid date string (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], AvailabilityQueryDto.prototype, "endDate", void 0);
//# sourceMappingURL=availability-query.dto.js.map