import * as angular from "angular";
import { TestController } from './test.controller';
import "./app.scss";

angular
    .module("app", [])
    .controller("test", TestController);