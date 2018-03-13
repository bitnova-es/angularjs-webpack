import { IComponentController } from "angular";

export class TestController implements IComponentController {
    property: string;

    constructor(){
        this.property = "Hello world!";
    }
}