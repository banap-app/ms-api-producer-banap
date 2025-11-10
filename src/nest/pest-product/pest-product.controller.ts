import { Controller, Get, Inject } from "@nestjs/common";
import { ApiSecurity } from "@nestjs/swagger";
import { PestProductEmbrapaGateway } from "src/core/pest-product/infrastructure/gateway/http/PestProductEmbrapaGateway";

@ApiSecurity('token')
@Controller('pest-product')
export class PestProductController {

    constructor(@Inject(PestProductEmbrapaGateway) private readonly embrapa: PestProductEmbrapaGateway){}

    @Get('')
    async getPestProducts() {
        const result = await this.embrapa.search('ALL', null)
        console.log(result)
    }
    
}