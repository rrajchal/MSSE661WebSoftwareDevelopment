export class Games {
    game_id: number; // Game ID, auto increment (primary key)
    game_name: string; // Name of the game
    category: string; // Category of the game
    description: string; // Description of the game
    image_url: string; // URL to an image representing the game
    type: string; // Type (Indoor/Outdoor)
    created_at: Date; // Default current timestamp
  
    constructor(
      game_id: number,
      game_name: string,
      category: string,
      description: string,
      image_url: string,
      type: string,
      created_at: Date
    ) {
      this.game_id = game_id;
      this.game_name = game_name;
      this.category = category;
      this.description = description;
      this.image_url = image_url;
      this.type = type;
      this.created_at = created_at;
    }
  }
  