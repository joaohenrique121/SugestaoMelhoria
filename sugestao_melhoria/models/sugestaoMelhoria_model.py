from odoo import models, fields, api
from datetime import datetime

class sugestaoMelhoria_model(models.Model):
    _name = 'sugestao.melhoria'
    _description = 'sugestoesMelhoria'

    nome = fields.Char(string='nome', required=True)
    descricao = fields.Text(string='descrição')
    data_envio = fields.Datetime(string='data de envio', default=lambda self: fields.Datetime.now())

