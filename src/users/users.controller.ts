import { Controller, Get, Patch, Param, Body, Query, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll(@Query() query: any, @Req() req: any) {
        const token = req.headers.authorization;
        if (!token) throw new UnauthorizedException('No token provided');
        return this.usersService.findAll(query, token);
    }

    @Patch(':id/role')
    updateRole(
        @Param('id') id: string,
        @Body('role') role: string,
        @Req() req: any,
    ) {
        const token = req.headers.authorization;
        if (!token) throw new UnauthorizedException('No token provided');
        return this.usersService.updateRole(id, role, token);
    }

    @Patch(':id/suspend')
    suspend(
        @Param('id') id: string,
        @Body('reason') reason: string,
        @Req() req: any,
    ) {
        const token = req.headers.authorization;
        if (!token) throw new UnauthorizedException('No token provided');
        return this.usersService.suspend(id, reason, token);
    }

    @Patch(':id/activate')
    activate(@Param('id') id: string, @Req() req: any) {
        const token = req.headers.authorization;
        if (!token) throw new UnauthorizedException('No token provided');
        return this.usersService.activate(id, token);
    }
}
