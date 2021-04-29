export default class FotoService {
  constructor(resource) {
    this.resource = resource('v1/fotos{/id}');
  }

  lista() {
    return this.resource
      .query()
      .then((res) => res.json());
  }

  cadastra(foto) {
    return foto._id
      ? this.resource
        .update({ id: foto._id }, foto)
      : this.resource
        .save(foto);
  }

  apaga(id) {
    return this.resource.delete({ id });
  }

  busca(id) {
    return this.resource
      .get({ id })
      .then((res) => res.json());
  }
}