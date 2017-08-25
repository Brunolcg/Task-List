# Task List

#Sinopse

Projeto que implementa um TaskList básico, a fim de estudos e testes. 

#Motivação

Teste técnico para avaliação

#Instalação

Verificar no web.config a connection string correta. 

#API Reference

-Entity Framework
-BootStrap
-AngulaJS
-jQuery

#database

--Definição tabela tasklist:
CREATE TABLE [dbo].[taskList](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](200) NOT NULL,
	[description] [varchar](4000) NOT NULL,
	[createDate] [date] NOT NULL,
	[lastUpdate] [date] NOT NULL,
	[status] [bit] NOT NULL,
	CONSTRAINT [PktaskList] PRIMARY KEY CLUSTERED 
	(
		[id]
	)
)

#Testes

Testes executados de forma unitária pelo desenvolvedor.

#License

GNU General Public License
