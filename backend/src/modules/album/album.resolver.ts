import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { CurrentUserProfile } from '../auth/decorators/current-user-profile.decorator';


@Resolver(() => Album)
export class AlbumResolver {
  constructor(private readonly albumService: AlbumService) { }

  @Query(() => Album)
  album(@Args('id', { type: () => Int }) id: number) {
    return this.albumService.findOne(id);
  }

  @Query(() => [Album])
  currentUserAlbums(@CurrentUserProfile() profileId: number) {
    return this.albumService.findAllUserAlbums(profileId);
  }

  @Query(() => [Album])
  userAlbums(@Args('profileId', { type: () => Int }) profileId: number) {
    return this.albumService.findAllUserAlbums(profileId);
  }
}