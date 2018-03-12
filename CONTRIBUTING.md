# Contribuindo com CapivaraJS

Nós gostamos muito de contribuições em nosso projeto, isso faz com que o  CapivaraJS fique melhor a cada dia, para isso criamos esse documento que gostaríamos que você seguisse:

* [Questões e Problemas](#question)
* [Issues e Bugs](#issue)
* [Requisição de novas funcionalidades](#feature)
* [Melhorias de documentação](#docs)
* [Orientação para a Submissão de Issue](#submit)
* [Orientação para a Submissão de Pull Request](#submit-pr)

## <a name="question"></a> Questões e Problemas?

Abrir uma issue não é a melhor maneira de resolver problemas e questões sobre a utilização do CapivaraJS, explicaremos melhor no próximo tópico quando se deve abrir issues, pois isso evita misturar problemas e questões com Bugs dificultando o trabalho de determinar qual a velocidade em que as requisições devem ser atendidas. A maneira mais rápida e eficiente de resolver isso é utilizando nossos grupos, devido a velocidade em que a equipe ou a comunidade pode resolver. Esses são os links para acessar os grupos:

Nossos links para contato:
- O [Google Group][groups] do CapivaraJS

## <a name="issue"></a>Issue ou Bug?

Se você encontrou um bug no código fonte, você pode nos ajudar submetendo uma issue em nosso [Repositório do GitHub][github]. Melhor ainda se essa issue vier com um Pull Request para fixar o problema.
A equipe empenha-se muito na resolução e fechamento de todas as issues que são abertas, infelizmente algumas podem demorar mais tempo que outras para serem fechadas, mas estaremos investindo muito esforço para que  o CapivaraJS alcance sempre as expectatívas dos usuários.
**Veja o tópico sobre [Orientações de Submissão](#submit).**

## <a name="feature"></a> Requisição de novas funcionalidades?

Você pode requerir uma nova funcionalidade para o CapivaraJS submetendo uma isssue ao nosso [Repositório do GitHub][github]

Se você quiser pode também não apenas abrir a issue, mas também ajudar na criação da funcionalidade, fazendo descrições bem detalhadas da sua issue, para que o time não tenha dúvidas durante o desenvolvimento.
Caso você consiga criar a issue e já resolver, visite a sessão de [Orientações sobre Pull Request](#submit-pr).

## <a name="docs"></a> Melhorias de documentação?

Se você tiver uma sugestão para a documentação, você pode abrir uma issue e descrever o problema ou melhorias que você tenha. 
Caso você esteja disposto a resolver o problema de documentação, seja ele pequeno como alguns erros ortográficos ou grandes inserções de texto. É muito importante criar [issues][github-new-issue] comentando qual é seu objetivo e a sua melhoria de documentação, evitando assim trabalho duplicado para outras pessoas que também possam ter encontrado o mesmo problema.

## <a name="submit"></a> Orientação para a Submissão de Issue
Antes de qualquer submissão de issue, não custa nada passar lá na sessão de  [issues][github-issues] e ver se já não foi aberta ou solucionada.
Se a sua issue for um bug que ainda não tenha sido reportado a nós, abra a issue imediatamente. Isso ajuda a concentrar o foco do time de desenvolvimento, pois não será necessário procurar problemas e sim apenas concerta-los, fazendo com que bugs sejam resolvidos com mais eficiência. 

A [nova issue][github-new-issue] contem vários campos que gostaríamos que fossem preenchidos para entendermos melhor o problema e categorizar por nível de urgência.

Mesmo que já falamos anteriormente reforçar nunca é demais, então aqui vão algumas dicas de como melhorar a documentação da issue, para que ela vá direto ao ponto.

* **Explicações** - Explique qual o motivo disso ser um problema para você
* **A versão do CapivaraJS** - Não se esqueça de dizer qual é a sua versão utilizada, pois muitas vezes uma migração para uma nova versão do sistema já pode resolver.
* **Reprodução do erro** - Nos mostre um exemplo do problema, pode ser utilizando [JSFiddle][jsfiddle] ou [Plunker][plunker] (ou qualquer outro editor online) para entendermos com mais facilidade
* **Issues Parecidas** -  Alguma issue reportada anteriormente é relacionada com a sua? Nos avise.
* **Sugestão para Solução** - Se você conseguiu resolver o problema você mesmo, avise também para ajudar outras pessoas.

## <a name="submit-pr"></a>Orientação para a Submissão de Pull Request

Esse é um pequeno tutorial de como enviar pull requests para o [CapivaraJS][CapivaraDoc]

* Primeiro acesse o github do [CapivaraJS][github] e faça um fork do projeto 
* Dentro do seu fork você pode fazer as suas modificações, logo em seguida você pode enviar as suas alterações para o seu fork no github utilizando os seguintes comandos, dentro da pasta do seu projeto 

		git add .

		git commit -m "Adicione aqui a mensagem que você quer que apareça"

		git push origin (master ou outraBranch)

* Agora entre novamente em nosso [github][github] e abra o pull request

* Escolha a opção de comparação entre o nosso repositório e o seu fork clicando em **compare across forks**
* Não se esqueça de nos dar permissão para editarmos qualquer código que você nos envie marcando a opção **Allow edits from maintainers**
* Agora é so enviar o seu **Pull Request** e esperar nossa resposta



[github-issues]: https://github.com/CapivaraJS/capivarajs/issues
[github-new-issue]: https://github.com/CapivaraJS/capivarajs/issues/new
[github]: https://github.com/CapivaraJS/capivarajs
[groups]: https://groups.google.com/d/forum/capivarajs
[individual-cla]: http://code.google.com/legal/individual-cla-v1.0.html
[jsfiddle]: http://jsfiddle.net/
[plunker]: https://plnkr.co/
[CapivaraDoc]: https://capivarajs.github.io/
