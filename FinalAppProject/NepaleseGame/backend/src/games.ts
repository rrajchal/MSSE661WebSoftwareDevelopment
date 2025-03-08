export class Games {
  game_id: number; // Game ID, auto increment (primary key)
  game_name: string; // Name of the game
  category: string; // Category of the game
  description: string; // Description of the game
  game_rule: string; // Rules of the game
  image: Buffer; // Inmage stored as binary data
  type: string; // Type (Indoor/Outdoor)
  created_date: Date; // Default current timestamp for creation date
  modified_date: Date; // Timestamp for the last modified date

  constructor(
    game_id: number,
    game_name: string,
    category: string,
    description: string,
    game_rule: string,
    image: Buffer,
    type: string,
    created_date: Date,
    modified_date: Date
  ) {
    this.game_id = game_id;
    this.game_name = game_name;
    this.category = category;
    this.description = description;
    this.game_rule = game_rule;
    this.image = image;
    this.type = type;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
