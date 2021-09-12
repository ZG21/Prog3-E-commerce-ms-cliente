import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, UsuarioCliente, DireccionCliente} from '../models';
import {UsuarioClienteRepository} from './usuario-cliente.repository';
import {DireccionClienteRepository} from './direccion-cliente.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly usuarioCliente: HasOneRepositoryFactory<UsuarioCliente, typeof Cliente.prototype.id>;

  public readonly direccionCliente: HasOneRepositoryFactory<DireccionCliente, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioClienteRepository') protected usuarioClienteRepositoryGetter: Getter<UsuarioClienteRepository>, @repository.getter('DireccionClienteRepository') protected direccionClienteRepositoryGetter: Getter<DireccionClienteRepository>,) {
    super(Cliente, dataSource);
    this.direccionCliente = this.createHasOneRepositoryFactoryFor('direccionCliente', direccionClienteRepositoryGetter);
    this.registerInclusionResolver('direccionCliente', this.direccionCliente.inclusionResolver);
    this.usuarioCliente = this.createHasOneRepositoryFactoryFor('usuarioCliente', usuarioClienteRepositoryGetter);
    this.registerInclusionResolver('usuarioCliente', this.usuarioCliente.inclusionResolver);
  }
}
