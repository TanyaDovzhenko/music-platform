import { CreateAlbumInput } from './dto/create-album.input';
import { Body, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CurrentUserProfile } from "../auth/decorators/current-user-profile.decorator";
import { AlbumService } from "./album.service";

@Controller('album')
export class AlbumController {
    constructor(private albumService: AlbumService) { }

    @Post('/')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    create(
        @CurrentUserProfile() profileId: number,
        @UploadedFiles() files,
        @Body() createAlbumDto: CreateAlbumInput) {
        return this.albumService.create(
            { ...createAlbumDto, authorUserProfileId: profileId }, files)
    }
}
