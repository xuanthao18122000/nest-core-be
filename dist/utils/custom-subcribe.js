"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mySubscriber = void 0;
const typeorm_1 = require("typeorm");
let mySubscriber = class mySubscriber {
    async beforeInsert(event) {
        if ((await event.manager.query(`Select @@time_zone`))[0]['@@time_zone'] !=
            '+00:00') {
            if (event.entity) {
                if (event.metadata.createDateColumn) {
                    event.entity[event.metadata.createDateColumn.databaseName] =
                        new Date();
                }
                if (event.metadata.updateDateColumn) {
                    event.entity[event.metadata.updateDateColumn.databaseName] =
                        new Date();
                }
            }
        }
    }
    async beforeUpdate(event) {
        if ((await event.manager.query(`Select @@time_zone`))[0]['@@time_zone'] !=
            '+00:00') {
            if (event.entity) {
                if (event.metadata.updateDateColumn) {
                    event.entity[event.metadata.updateDateColumn.databaseName] =
                        new Date();
                }
            }
        }
    }
    beforeRemove(event) {
        event.manager.query(`SET time_zone = '+00:00';`);
    }
};
mySubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], mySubscriber);
exports.mySubscriber = mySubscriber;
//# sourceMappingURL=custom-subcribe.js.map