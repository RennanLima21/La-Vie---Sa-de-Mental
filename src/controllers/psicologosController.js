const Psicologos = require("../models/psicologos");
const bcrypt = require("bcryptjs");

const PsicologosController = {
  listarPsicologo: async (req, res) => {
    try {
      const listaDePsicologos = await Psicologos.findAll({
      });
      res.status(200).json(listaDePsicologos);
    } catch (err) {
      res.json("Não foi possível exibir");
      console.error(err);
    }
  },

  async listarPsicologoID(req, res) {
    try {
      const { id } = req.params;
      const listarUmPsicologo = await Psicologos.findByPk(id, {
        attributes: {
          exclude: ['senha']
        }
      });
      if (!listarUmPsicologo) return res.status(404).json("id não encontrado");
      res.json(listarUmPsicologo);
    } catch (err) {
      console.error(err);
    }
  },

  async cadastrarPsicologo(req, res) {
    try {
      const { nome, email, senha, apresentacao } = req.body;
      const newSenha = bcrypt.hashSync(senha, 10);

     
      const newUsuario = await Psicologos.create({
        nome,
        email,
        senha:newSenha,
        apresentacao
      });
      res.status(201).json(newUsuario);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },

  async deletarPsicologo(req, res) {
    try {
      const { id_psicologo } = req.params;
      const psicologoToDelete = await Psicologos.findByPk(id_psicologo, {
        
      });

      if (!psicologoToDelete) return res.status(404).json("id não encontrado");

      await Psicologos.destroy({
        where: {
          id_psicologo,
        },
      })
      res.status(204).json({message:"Psicologo Deletado"});
    } catch (error) {
      return res.status(404).json(error.message)
    }
  },

  async atualizarPsicologo(req, res) {
    try {
      const { id_psicologo } = req.params;
      const { nome, email, senha, apresentacao } = req.body;
      const newSenha = bcrypt.hashSync(senha, 10);
      const psicologoToUpdate = await Psicologos.findByPk(id_psicologo, {
        
      });
      if (!psicologoToUpdate) return res.status(404).json("id não encontrado");
      const psicologoAtualizado = await Psicologos.update(
        {
          nome,
          email,
          senha:newSenha,
          apresentacao
        },
        {
          where: {
            id_psicologo,
          },
        }
      );
      res.status(201).json('Psicólogo atualizado');
    } catch {
      res.status(400).json('Psicólogo não atualizado')
    }
  },
};

module.exports = PsicologosController;