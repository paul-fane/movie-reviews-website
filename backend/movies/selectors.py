from django.db.models import Avg

def filter_queryset(queryset, request, *args, **kwargs):
    if "visto" in request.query_params:
        visto = request.GET.get("visto")
        if visto != '':
            if visto == "visto" and request.user:
                user = request.user
                queryset = user.films.all()
            elif visto == "non-visto":
                user = request.user
                queryset = queryset.exclude(watchlist=user)
                
    if "avarage" in request.query_params:
        avarage = request.GET.get("avarage")
        if avarage == "true":
            queryset = queryset.annotate(avg_rating=Avg('reviews__vote')).order_by('-avg_rating')

    if "name" in request.query_params:
        name = request.GET.get("name")
        if name != '':
            queryset = queryset.filter(name__contains=name)
    if "piattaforma" in request.query_params:
        piattaforma = request.GET.get("piattaforma")
        if piattaforma != '':
            queryset = queryset.filter(piattaforma=piattaforma)

    return queryset