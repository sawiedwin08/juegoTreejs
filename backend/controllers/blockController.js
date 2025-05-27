const Block = require('../models/Block')

exports.getBlocks = async (req, res) => {
    try {
        const level = parseInt(req.query.level) || 1;

        const blocks = await Block.find({ level: level }).select('name x y z level role -_id'); 

        res.json(blocks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obteniendo bloques', error });
    }
};



// Agregar un nuevo bloque
exports.addBlock = async (req, res) => {
    const { name, x, y, z, level, rol } = req.body;
    const newBlock = new Block({ name, x, y, z, level, rol });
    await newBlock.save();

    res.status(201).json({ message: 'Se ha guardado un bloque exitosamente', block: newBlock });
}


// Cargar lote desde JSON (para inicialización desde Blender)
exports.addMultipleBlocks = async (req, res) => {
    const blocks = req.body // array [{ x, y, z }, ...]
    await Block.insertMany(blocks)
    res.status(201).json({ message: 'Bloques guardados exitosamente', count: blocks.length })
}
