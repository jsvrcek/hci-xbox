import games_list from "../xbox_games.json"

export function lookupGames(games: string[]){
    if(!games?.length){
        return []
    }
    const foundGames = []
    for(const game of games){
        for(const gl of games_list){
            console.log("looking for game in games list:", game);
            if(game.toLowerCase() === gl.title.toLowerCase()){
                foundGames.push(gl);
            }
        }
    }
    return foundGames;
}