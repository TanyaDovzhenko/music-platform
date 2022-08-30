import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { AddStyleType } from 'src/types/add-style-type.enum';
import { Public } from '../auth/decorators/public.decorator';
import { Style } from './entities/style.entity';
import { StyleService } from './style.service';


@Resolver(() => Style)
export class StyleResolver {
    constructor(private readonly styleService: StyleService) { }

    @Public()
    @Query(returns => [Style])
    styles() {
        return this.styleService.findAll();
    }

    @Query(returns => Style)
    style(@Args('id', { type: () => Int }) id: number) {
        return this.styleService.findOne(id);
    }

    @Mutation(() => Boolean)
    addStyle(
        @Args('type') type: AddStyleType,
        @Args('objId', { type: () => Int }) objId: number,
        @Args('styleId', { type: () => Int }) styleId: number) {
        return this.styleService.addStyle(type, objId, styleId)
    }
}
