import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CurrentUserProfile } from '../auth/decorators/current-user-profile.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { CreateTrackInput } from './dto/create-track.input';
import { TrackService } from './track.service';


@Controller('track')
export class TrackController {
    constructor(private trackService: TrackService) { }

    @Post('/')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'audio', maxCount: 1 }]))
    create(
        @UploadedFiles() files,
        @Body() createTrackDto: CreateTrackInput,
        @CurrentUserProfile() profileId: number) {
        return this.trackService.create(
            { ...createTrackDto, userProfileId: profileId }, files)
    }
}
