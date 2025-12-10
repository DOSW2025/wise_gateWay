import {Controller,Param,Req,Get,Post,Put,Body,Query,UseGuards,UseInterceptors,UploadedFile,Res,ParseIntPipe,DefaultValuePipe,Logger,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MaterialesService } from './materiales.service';
import type { Request, Response, Express } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('materiales')
@UseGuards(JwtAuthGuard)
export class MaterialesController {
  private readonly logger = new Logger(MaterialesController.name);

  constructor(private readonly materialesService: MaterialesService) {}

  /**
   * POST /materiales
   * Subir un nuevo material (PDF)
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async subirNuevoMaterial(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() request: Request,
  ) {
    return this.materialesService.subirNuevoMaterial(file, body, request);
  }

  /**
   * GET /materiales/user/:userId
   * Obtener materiales de un usuario con estadísticas
   */
  @Get('user/:userId')
  async getMaterialsByUser(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    return this.materialesService.getMaterialsByUser(userId, request);
  }

  /**
   * GET /materiales/stats/popular
   * Obtener materiales más populares
   */
  @Get('stats/popular')
  async getPopularMaterials(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Req() request: Request,
  ) {
    return this.materialesService.getPopularMaterials(limit, request);
  }

  /**
   * POST /materiales/:id/ratings
   * Registrar calificación para un material
   */
  @Post(':id/ratings')
  async rateMaterial(
    @Param('id') materialId: string,
    @Body() body: any,
    @Req() request: Request,
  ) {
    return this.materialesService.rateMaterial(materialId, body, request);
  }

  /**
   * GET /materiales/:id/ratings
   * Obtener calificaciones de un material
   */
  @Get(':id/ratings')
  async getMaterialRatings(
    @Param('id') materialId: string,
    @Req() request: Request,
  ) {
    return this.materialesService.getMaterialRatings(materialId, request);
  }

  /**
   * GET /materiales/:id/download
   * Descargar un material específico
   */
  @Get(':id/download')
  async downloadMaterial(
    @Param('id') materialId: string,
    @Res() res: Response,
    @Req() request: Request,
  ) {
    return this.materialesService.downloadMaterial(materialId, res, request);
  }

  /**
   * GET /materiales/filter
   * Filtrar materiales con filtros avanzados y paginación
   */
  @Get('filter')
  async searchMaterials(@Query() filters: any, @Req() request: Request) {
    return this.materialesService.searchMaterials(filters, request);
  }

  /**
   * GET /materiales/:id
   * Obtener información detallada de un material específico
   */
  @Get(':id')
  async getMaterialDetail(
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    return this.materialesService.getMaterialDetail(id, request);
  }

  

  /**
   * GET /materiales/autocomplete
   * Autocompletado de búsqueda de materiales
   */
  @Get('autocomplete')
  async autocompleteMateriales(@Query() query: any, @Req() request: Request) {
    return this.materialesService.autocompleteMaterials(query, request);
  }

  /**
   * PUT /materiales/:id
   * Actualizar versión de un material existente
   */
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async actualizarMaterialVersion(
    @Param('id') materialId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() request: Request,
  ) {
    return this.materialesService.actualizarMaterialVersion(
      materialId,
      file,
      body,
      request,
    );
  }
}
