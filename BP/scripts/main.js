import { world } from "@minecraft/server"

const overworld = world.getDimension("overworld")

world.sendMessage("hi it's gulemm")

function add(v, x, y, z) {
    return { x: v.x + x, y: v.y + y, z: v.z + z }
}

function attemptSnowGolem(block) {
    const bs = [block, block.above(1), block.above(2)]
    if ((block.matches("carved_pumpkin") || block.matches("lit_pumpkin"))
        && bs[1].matches("snow")
        && bs[2].matches("snow")) {
        bs.forEach(b => b.setType("air"))
        overworld.spawnEntity("snow_golem", add(block.location, 0.5, 0, 0.5)).nameTag = "Grumm"
    }
}

world.afterEvents.playerPlaceBlock.subscribe(data => {
    if (data.block.matches("carved_pumpkin") || data.block.matches("lit_pumpkin")) {
        attemptSnowGolem(data.block) // won't work, needs beforeevent
    } else if (data.block.matches("snow")) {
        attemptSnowGolem(data.block.below(2))
    }
})