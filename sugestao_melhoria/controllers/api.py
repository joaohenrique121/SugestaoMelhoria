from odoo import http
from odoo.http import request, Response
import json

class SugestaoAPI(http.Controller):

    def _make_response(self, data, status=200):
        """Helper para criar response JSON com CORS."""
        response = Response(
            json.dumps(data),
            status=status,
            content_type='application/json;charset=utf-8',
        )
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response

    @http.route('/api/sugestoes', type='http', auth='public', methods=['POST'], csrf=False)
    def receber_sugestao(self, **kwargs):
        try:
            data = json.loads(request.httprequest.data.decode())
        except Exception:
            return self._make_response({"erro": "JSON inválido"}, status=400)

        # Pega os dados dentro de 'params' para JSON-RPC
        params = data.get('params') if isinstance(data, dict) else None
        if not params:
            # Se não for JSON-RPC, tenta pegar direto do JSON
            params = data

        nome = params.get('nome') if isinstance(params, dict) else None
        descricao = params.get('descricao') if isinstance(params, dict) else None

        if not nome:
            return self._make_response({"erro": "Campo 'nome' é obrigatório."}, status=400)

        sugestao = request.env['sugestao.melhoria'].sudo().create({
            'nome': nome,
            'descricao': descricao,
        })

        return self._make_response({
            "code": 200,
            "mensagem": "Sugestão registrada com sucesso!",
            "sugestao": {
                "id": sugestao.id,
                "nome": sugestao.nome,
                "descricao": sugestao.descricao,
                "data_criacao": str(sugestao.create_date)
            }
        })

    @http.route('/api/sugestoes', type='http', auth='public', methods=['GET'], csrf=False)
    def listar_sugestoes(self, **kwargs):
        sugestoes = request.env['sugestao.melhoria'].sudo().search([])
        resultado = [{
            'id': s.id,
            'nome': s.nome,
            'descricao': s.descricao,
            'data_criacao': str(s.create_date)
        } for s in sugestoes]

        return self._make_response({
            "code": 200,
            "sugestoes": resultado
        })

    @http.route('/api/sugestoes', type='http', auth='public', methods=['OPTIONS'], csrf=False)
    def options_sugestoes(self, **kwargs):
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
        return request.make_response('', headers=headers)
