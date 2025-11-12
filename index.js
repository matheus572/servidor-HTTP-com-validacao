import express from "express";


const host = "0.0.0.0";
const porta = 3000;
var listaUsuarios = [];

const server = express();

server.use(express.urlencoded({extended: true}));

server.get("/", (requisicao, resposta) => {
    resposta.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Menu do Sistema</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <div class="container mt-4">
                    <h1 class="mb-3">Menu Principal</h1>
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/logout">Logout</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Cadastros</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/cadastroUsuario">Usuários</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/listarUsuarios">Listar Usuários</a>
                        </li>
                    </ul>
                </div>

                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </body>
        </html>
    `);
});

server.get("/login", (requisicao,resposta) => {
    resposta.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Login</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <div class="container mt-5">
                    <div class="row justify-content-center">
                        <div class="col-md-6 col-lg-4">
                            <div class="card shadow-sm">
                                <div class="card-body p-4">
                                    <h3 class="text-center mb-4">Login do Sistema</h3>
                                    <form action="/login" method="POST">
                                        <div class="mb-3">
                                            <label for="email" class="form-label">E-mail</label>
                                            <input type="text" class="form-control" id="email" name="email">
                                        </div>
                                        <div class="mb-3">
                                            <label for="senha" class="form-label">Senha</label>
                                            <input type="password" class="form-control" id="senha" name="senha">
                                        </div>
                                        <div class="d-grid gap-2 mt-4">
                                            <button type="submit" class="btn btn-primary">Entrar</button>
                                            <a href="/" class="btn btn-outline-secondary">Voltar ao Menu</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" xintegrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </body>
        </html>
    `);
});

server.post("/login", (requisicao,resposta) => {
    const email = requisicao.body.email;
    const senha = requisicao.body.senha;
    
    if(email && senha){
        resposta.redirect("/");
    }
    else{
        let conteudo = `
            <!DOCTYPE html>
            <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Login</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                </head>
                <body>
                    <div class="container mt-5">
                        <div class="row justify-content-center">
                            <div class="col-md-6 col-lg-4">
                                <div class="card shadow-sm">
                                    <div class="card-body p-4">
                                        <h3 class="text-center mb-4">Login do Sistema</h3>
                                        <form action="/login" method="POST">
                                            <div class="mb-3">
                                                <label for="email" class="form-label">E-mail</label>
                                                <input type="text" class="form-control" id="email" name="email" value="${email}">
                                            `;
            if(!email){
                conteudo+=`
                <div>
                    <p class="text-danger">Por favor, informe o E-mail</p>
                </div>
                `
            }
            conteudo+=  `
                                            </div>
                                            <div class="mb-3">
                                                <label for="senha" class="form-label">Senha</label>
                                                <input type="password" class="form-control" id="senha" name="senha" value="${senha}">
                                            `;
            if(!senha){
                conteudo+=`
                <div>
                    <p class="text-danger">Por favor, informe a enha</p>
                </div>
                `
            }
            conteudo+=  `
                                            </div>
                                            <div class="d-grid gap-2 mt-4">
                                                <button type="submit" class="btn btn-primary">Entrar</button>
                                                <a href="/" class="btn btn-outline-secondary">Voltar ao Menu</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" xintegrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                </body>
            </html>
        `;
        resposta.send(conteudo);
    }

});

server.get("/logout",(requisicao,resposta) => {
    resposta.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Logout</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <div class="container mt-5">
                    <div class="row justify-content-center">
                        <div class="col-md-6 text-center">
                            <div class="alert alert-success" role="alert">
                                <h4>Logout efetuado com sucesso!</h4>
                            </div>
                            <a href="/" class="btn btn-primary mt-3">Voltar ao Menu Principal</a>
                        </div>
                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" xintegrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </body>
        </html>
    `)
});

server.get("/cadastroUsuario", (requisicao,resposta) => {
    resposta.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cadastro de Usuário</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
             <body>
                <div class="container mt-4">
                    <h1 class="text-center">Cadastro de Usuários</h1>
                    
                    <form method="POST" action="/adicionarUsuario" class="border p-4 rounded shadow-sm bg-light" novalidate>
                        
                        <div class="mb-3">
                            <label for="cnpj" class="form-label">CNPJ</label>
                            <input type="text" id="cnpj" name="cnpj" class="form-control">
                        </div>

                        <div class="mb-3">
                            <label for="razao" class="form-label">Razão Social</label>
                            <input type="text" id="razao" name="razao" class="form-control" />
                        </div>

                        <div class="mb-3">
                            <label for="fantasia" class="form-label">Nome Fantasia</label>
                            <input type="text" id="fantasia" name="fantasia" class="form-control" />
                        </div>

                        <div class="mb-3">
                            <label for="endereco" class="form-label">Endereço</label>
                            <input type="text" id="endereco" name="endereco" class="form-control" />
                        </div>

                        <div class="mb-3">
                            <label for="cidade" class="form-label">Cidade</label>
                            <input type="text" id="cidade" name="cidade" class="form-control"/>
                        </div>

                        <div class="mb-3">
                            <label for="cep" class="form-label">CEP</label>
                            <input type="number" id="cep" name="cep" class="form-control"/>
                        </div>

                        <div class="col-md-3">
                                <label for="uf" class="form-label">UF</label>
                                <select class="form-select" id="uf" name="uf">
                                    <option selected disabled value="">Escolha um estado...</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                            </div>

                        <div class="mb-3">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" id="email" name="email" class="form-control" />
                        </div>

                        

                        <div class="mb-3">
                            <label for="telefone" class="form-label">Telefone</label>
                            <input type="number" id="telefone" name="telefone" class="form-control" />
                        </div>

                        
                        
                        <div class="d-flex gap-2">
                             <button class="btn btn-primary" type="submit">Cadastrar</button>
                            <a class="btn btn-secondary" href="/">Voltar</a>
                        </div>
                    </form>
                </div>
            </body>
        </html>
    `);
})

server.post('/adicionarUsuario', (requisicao, resposta) => {
    const cnpj = requisicao.body.cnpj;
    const razao = requisicao.body.razao;
    const fantasia = requisicao.body.fantasia;
    const endereco = requisicao.body.endereco;
    const cidade = requisicao.body.cidade;
    const cep = requisicao.body.cep;
    const uf = requisicao.body.uf;
    const email = requisicao.body.email;
    const telefone = requisicao.body.telefone;
    
    if(cnpj && razao && fantasia && endereco && cidade && cep && uf && email && telefone){
        listaUsuarios.push({cnpj, razao, fantasia, endereco, cidade, cep, uf, email, telefone});
        resposta.redirect("/listarUsuarios");
    }
    else{
        let conteudo = `
            <!DOCTYPE html>
            <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Cadastro de Usuário</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                </head>
                <body>
                    <div class="container mt-4">
                        <h1 class="text-center">Cadastro de Usuários</h1>
                        
                        <form method="POST" action="/adicionarUsuario" class="border p-4 rounded shadow-sm bg-light" novalidate>
                            
                            <div class="mb-3">
                                <label for="cnpj" class="form-label">CNPJ</label>
                                <input type="text" id="cnpj" name="cnpj" class="form-control" value="${cnpj}">
                            `;
            if(!cnpj){
                conteudo+=`
                <div>
                    <p class="text-danger">Por favor, informe o CNPJ</p>
                </div>
                `
            }
            conteudo+=  `</div>

                            <div class="mb-3">
                                <label for="razao" class="form-label">Razão Social</label>
                                <input type="text" id="razao" name="razao" class="form-control" value="${razao}"/>
                            `;
            if(!razao){
                conteudo+=`
                <div>
                    <p class="text-danger">Por favor, informe a Razão Social</p>
                </div>
                `
            }
             conteudo+= `</div>

                            <div class="mb-3">
                                <label for="fantasia" class="form-label">Nome Fantasia</label>
                                <input type="text" id="fantasia" name="fantasia" class="form-control" value="${fantasia}"/>
                            `;
            if(!fantasia){
                conteudo+=`
                <div>
                    <p class="text-danger">Por favor, informe o Nome fantasia</p>
                </div>
                `
            }
            conteudo+=`</div>

                            <div class="mb-3">
                                <label for="endereco" class="form-label">Endereço</label>
                                <input type="text" id="endereco" name="endereco" class="form-control" value="${endereco}"/>
                            `;
            if(!endereco){
                conteudo+=`
                <div>
                    <p class="text-danger">Por favor, informe o Endereço</p>
                </div>
                `
            }
            conteudo+=`
                            </div>

                            <div class="mb-3">
                                <label for="cidade" class="form-label">Cidade</label>
                                <input type="text" id="cidade" name="cidade" class="form-control" value="${cidade}"/>
                            `;
            if(!cidade){
                conteudo+=`
                <div>
                    <p class="text-danger">Por favor, informe a Cidade</p>
                </div>
                `
            }
            conteudo+=`
                            </div>

                            <div class="mb-3">
                                <label for="cep" class="form-label">CEP</label>
                                <input type="number" id="cep" name="cep" class="form-control" value="${cep}"/>
                            `;
            if(!cep){
                conteudo+=`
                <div>
                    <p class="text-danger">Por favor, informe o CEP</p>
                </div>
                `
            }
            conteudo+=`
                            </div>

                            <div class="col-md-3">
                                    <label for="uf" class="form-label">UF</label>
                                    <select class="form-select" id="uf" name="uf" value="${uf}">
                                        <option selected disabled value="">Escolha um estado...</option>
                                        <option value="AC">Acre</option>
                                        <option value="AL">Alagoas</option>
                                        <option value="AP">Amapá</option>
                                        <option value="AM">Amazonas</option>
                                        <option value="BA">Bahia</option>
                                        <option value="CE">Ceará</option>
                                        <option value="DF">Distrito Federal</option>
                                        <option value="ES">Espírito Santo</option>
                                        <option value="GO">Goiás</option>
                                        <option value="MA">Maranhão</option>
                                        <option value="MT">Mato Grosso</option>
                                        <option value="MS">Mato Grosso do Sul</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="PA">Pará</option>
                                        <option value="PB">Paraíba</option>
                                        <option value="PR">Paraná</option>
                                        <option value="PE">Pernambuco</option>
                                        <option value="PI">Piauí</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="RN">Rio Grande do Norte</option>
                                        <option value="RS">Rio Grande do Sul</option>
                                        <option value="RO">Rondônia</option>
                                        <option value="RR">Roraima</option>
                                        <option value="SC">Santa Catarina</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="SE">Sergipe</option>
                                        <option value="TO">Tocantins</option>
                                    </select>
                            `;
            if(!uf){
                conteudo+=`
                <div>
                    <p class="text-danger">Por favor, informe o UF</p>
                </div>
                `
            }
            conteudo+=`
                                </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">E-mail</label>
                                <input type="email" id="email" name="email" class="form-control" value="${email}"/>
                            `;
            if(!email){
                conteudo+=`
                <div>
                    <p class="text-danger">Por favor, informe o E-mail</p>
                </div>
                `
            }
            conteudo+=`
                            </div>

                            

                            <div class="mb-3">
                                <label for="telefone" class="form-label">Telefone</label>
                                <input type="number" id="telefone" name="telefone" class="form-control" value="${telefone}"/>
                            `;
            if(!telefone){
                conteudo+=`
                <div>
                    <p class="text-danger">Por favor, informe o Telefone</p>
                </div>
                `
            }
            conteudo+=`
                            </div>

                            
                            
                            <div class="d-flex gap-2">
                                <button class="btn btn-primary" type="submit">Cadastrar</button>
                                <a class="btn btn-secondary" href="/">Voltar</a>
                            </div>
                        </form>
                    </div>
                </body>
            </html>
        `;
        resposta.send(conteudo);
    }

    });

server.get("/listarUsuarios", (requisicao, resposta) => {
    let conteudo = `
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Lista de usuários</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <div class="container mt-4">
                    <h1>Lista de Usuários</h1>
                    
                    <table class="table table-striped table-hover table-bordered shadow-sm">
                        <thead class="table-dark">
                            <tr>
                                <th>CNPJ</th>
                                <th>Razão Social</th>
                                <th>Nome Fantasia</th>
                                <th>Endereço</th>
                                <th>Cidade</th>
                                <th>CEP</th>
                                <th>UF</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                
                            </tr>
                        </thead>
                        <tbody>`;
    for (let i = 0; i < listaUsuarios.length; i++) {
         conteudo += `
            <tr>
                <td>${listaUsuarios[i].cnpj}</td>
                <td>${listaUsuarios[i].razao}</td>
                <td>${listaUsuarios[i].fantasia}</td>
                <td>${listaUsuarios[i].endereco}</td>
                <td>${listaUsuarios[i].cidade}</td>
                <td>${listaUsuarios[i].cep}</td>
                <td>${listaUsuarios[i].uf}</td>
                <td>${listaUsuarios[i].email}</td>
                <td>${listaUsuarios[i].telefone}</td>
                
            </tr>
        `;
    }
    conteudo+=`
                        </tbody>
                    </table>
                    <div class="d-flex gap-2 mt-3">
                        <a href="/cadastroUsuario" class="btn btn-primary">Cadastrar Novo Usuário</a>
                        <a href="/" class="btn btn-secondary">Voltar ao Menu</a>
                    </div>
                </div>
            </body>
        </html>
    `
    resposta.send(conteudo);
});

server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`)
});