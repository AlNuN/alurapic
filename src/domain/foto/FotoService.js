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
    return this.resource
      .save(foto);
  }

  apaga(id) {
    return this.resource.delete({ id });
  }
}