package projeto

class User {

    String nome
    String email
    String senha
    String endereco
    String telefone
    Boolean adm = false

    static constraints = {
        nome maxSize: 150
        email maxSize: 150
        senha maxSize: 10
        endereco maxSize: 100
        telefone maxSize: 14

    }
}
