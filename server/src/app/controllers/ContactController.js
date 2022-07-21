const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    // Obter UM registro
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found!' });
    }

    response.json(contact);
  }

  async store(request, response) {
    // Criar novo registro
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) return response.status(400).json({ error: 'Name is required!' });

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) return response.status(400).json({ error: 'E-mail already in use.' });

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    // Atualizar um registro
    const { id } = request.params;
    const {
      name,
      email,
      phone,
      category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!name) return response.status(400).json({ error: 'Name is required!' });

    if (!contactExists) return response.status(400).json({ error: 'Contact not found' });

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) return response.status(400).json({ error: 'E-mail already in use.' });

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
