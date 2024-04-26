import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Imprime la variable de entorno para verificar que se está leyendo correctamente
console.log(process.env.DATABASE_URL); // Debería mostrar la URL de la base de datos completa

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // Si se requiere SSL y estás usando un certificado autofirmado (como en Heroku)
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export class ProductModel {
  // Obtener todos los productos, opcionalmente filtrados por familia y subfamilia

  static async getAll({ CodFamil, CodSubFamil }) {
    console.log('getAll');
    let query = 'SELECT * FROM productos';
    let params = [];
    
      if (CodFamil) {
        query += ' WHERE "codfamil" = $1';
        params.push(CodFamil);
      }

      if (CodSubFamil) {
        if (params.length > 0) {
          query += ' AND "codsubfamil" = $2';
        } else {
          query += ' WHERE "codsubfamil" = $1';
        }
        params.push(CodSubFamil);
      }
    
    try {
      const { rows } = await pool.query(query, params);
      return rows;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Error fetching products');
    }

  }

  // Obtener un producto específico por su código
  static async getById({ id }) {
    
      const { rows } = await pool.query(
        'SELECT * FROM productos WHERE "codprodu" = $1;',
        [id]
      );
      return rows.length > 0 ? rows[0] : null;

  }

  // Crear un nuevo producto
  static async create({ input }) {
    const {
      CodProdu,
      DesProdu,
      CodFamil,
      Comentario
      // Agrega más campos según sea necesario
    } = input;

    const { rows } = await pool.query(
      `INSERT INTO productos ("codprodu", "desprodu", "codfamil", "comentario")
       VALUES ($1, $2, $3, $4)
       RETURNING *;`,
      [CodProdu, DesProdu, CodFamil, Comentario]
    );

    return rows[0];
  }

  // Actualizar un producto existente
  static async update({ id, input }) {
    const fields = Object.keys(input).map((key, index) => `"${key}" = $${index + 2}`).join(", ");
    const values = Object.values(input);

    const { rows } = await pool.query(
      `UPDATE productos SET ${fields} WHERE "codprodu" = $1 RETURNING *;`,
      [id, ...values]
    );

    return rows[0];
  }

  // Eliminar un producto
  static async delete({ id }) {
    const { rows } = await pool.query(
      'DELETE FROM productos WHERE "codprodu" = $1 RETURNING *;',
      [id]
    );

    return rows[0];
  }
}

