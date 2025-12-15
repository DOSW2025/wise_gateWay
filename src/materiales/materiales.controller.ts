import {Controller,Param,Req,Get,Post,Put,Delete,Body,Query,UseGuards,UseInterceptors,UploadedFile,Res,ParseIntPipe,DefaultValuePipe,Logger,} from '@nestjs/common';
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
   * GET /materiales/user/:userId/stats
   * Obtener estadísticas de materiales de un usuario
   */
  @Get('user/:userId/stats')
  async getMaterialsStatsByUser(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    return this.materialesService.getMaterialsStatsByUser(userId, request);
  }

  /**
   * GET /materiales/user/:userId/top-downloaded
   * Obtener materiales más descargados de un usuario
   */
  @Get('user/:userId/top-downloaded')
  async getTopDownloadedMaterialsByUser(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    return this.materialesService.getTopDownloadedMaterialsByUser(userId, request);
  }

  /**
   * GET /materiales/user/:userId/top-viewed
   * Obtener materiales más vistos de un usuario
   */
  @Get('user/:userId/top-viewed')
  async getTopViewedMaterialsByUser(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    return this.materialesService.getTopViewedMaterialsByUser(userId, request);
  }

  /**
   * GET /materiales/user/:userId/tags-percentage
   * Obtener porcentaje de tags de materiales de un usuario
   */
  @Get('user/:userId/tags-percentage')
  async getTagsPercentageByUser(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    return this.materialesService.getTagsPercentageByUser(userId, request);
  }

  /**
   * GET /materiales/user/:userId/average-rating
   * Obtener calificación promedio de materiales de un usuario
   */
  @Get('user/:userId/average-rating')
  async getUserMaterialsAverageRating(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    return this.materialesService.getUserMaterialsAverageRating(userId, request);
  }

  /**
   * GET /materiales/user/:userId/top
   * Obtener materiales top de un usuario
   */
  @Get('user/:userId/top')
  async getTopMaterialsByUser(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    return this.materialesService.getTopMaterialsByUser(userId, request);
  }

  /**
   * GET /materiales/search
   * Buscar materiales por nombre con paginación
   */
  @Get('search')
  async searchMaterialsByName(
    @Query('nombre') nombre: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Req() request: Request,
  ) {
    return this.materialesService.searchMaterialsByName(nombre, skip, take, request);
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
   * GET /materiales/stats/count
   * Obtener contador de materiales
   */
  @Get('stats/count')
  async getMaterialsCount(@Req() request: Request) {
    return this.materialesService.getMaterialsCount(request);
  }

  /**
   * GET /materiales/stats/tags-percentage
   * Obtener porcentaje de etiquetas en materiales
   */
  @Get('stats/tags-percentage')
  async getTagsPercentage(@Req() request: Request) {
    return this.materialesService.getTagsPercentage(request);
  }

  /**
   * GET /materiales/stats/by-date
   * Obtener estadísticas de materiales por fecha
   */
  @Get('stats/by-date')
  async getMaterialsByDate(@Req() request: Request) {
    return this.materialesService.getMaterialsByDate(request);
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
   * GET /materiales/:id/ratings/list
   * Obtener lista de calificaciones de un material
   */
  @Get(':id/ratings/list')
  async getMaterialRatingsList(
    @Param('id') materialId: string,
    @Req() request: Request,
  ) {
    return this.materialesService.getMaterialRatingsList(materialId, request);
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
   * DELETE /materiales/:id
   * Eliminar un material específico
   */
  @Delete(':id')
  async deleteMaterial(
    @Param('id') materialId: string,
    @Req() request: Request,
  ) {
    return this.materialesService.deleteMaterial(materialId, request);
  }

  /**
   * PUT /materiales/:id
   * Actualizar versión de un material existente
   */
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async actualizarMaterialVersion(
    @Param('id') materialId: string,
    @Req() request: Request,
    @UploadedFile() file?: Express.Multer.File,
    @Body() body: any = {},
  ) {
    return this.materialesService.actualizarMaterialVersion(
      materialId,
      file,
      body,
      request,
    );
  }

  /**
   * GET /materiales
   * Obtener lista de todos los materiales con paginación
   */
  @Get()
  async getAllMaterials(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Req() request: Request,
  ) {
    return this.materialesService.getAllMaterials(request, skip, take);
  }
}
