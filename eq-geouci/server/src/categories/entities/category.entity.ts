import { ApiProperty } from '@nestjs/swagger';

export class Category {
    @ApiProperty({ description: 'The unique identifier of the category' })
    id: string
    @ApiProperty({ description: 'The name of the category' })
    name: string
    @ApiProperty({ description: 'Category description' })
    description: string
}

