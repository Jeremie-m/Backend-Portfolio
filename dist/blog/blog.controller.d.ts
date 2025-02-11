import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDto } from './dto/post.dto';
import { FindPostsDto } from './dto/find-posts.dto';
export declare class BlogController {
    findAll(query: FindPostsDto): Promise<PostDto[]>;
    findOne(id: string): Promise<PostDto>;
    create(createPostDto: CreatePostDto): Promise<PostDto>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<PostDto>;
    remove(id: string): Promise<void>;
}
