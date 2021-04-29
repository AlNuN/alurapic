export default class FotoService {
  constructor(resource) {
    this.resource = resource('v1/fotos{/id}');
  }

  lista() {
    return this.resource
      .query()
      .then((res) => res.json(),
        (err) => {
          console.log(err);
          throw new Error('Não foi possível obter as fotos. Tente mais tarde.');
        }
      );
  }

  cadastra(foto) {
    return foto._id
      ? this.resource
        .update({ id: foto._id }, foto)
      : this.resource
        .save(foto);
  }

  apaga(id) {
    return this.resource.delete({ id })
      .then(null, (err) => {
        console.log(err);
        throw new Error('Não foi possível remover a foto');
      });
  }

  busca(id) {
    return this.resource
      .get({ id })
      .then((res) => res.json());
  }
}