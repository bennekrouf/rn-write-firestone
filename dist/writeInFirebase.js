"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeInFirebase = void 0;
const firestore_1 = __importDefault(require("@react-native-firebase/firestore"));
const getUser_1 = require("./getUser");
const writeInFirebase = (app, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, getUser_1.getUser)();
    const id = (user === null || user === void 0 ? void 0 : user.email) || (user === null || user === void 0 ? void 0 : user.uid);
    const appCollection = app === null || app === void 0 ? void 0 : app.toLocaleLowerCase();
    console.log(`Try to persist in : ${appCollection}/${id}`);
    yield (0, firestore_1.default)()
        .collection(appCollection)
        .doc(id)
        .set(data, { merge: true });
    console.log('AFTER firestore()');
    return user;
});
exports.writeInFirebase = writeInFirebase;
