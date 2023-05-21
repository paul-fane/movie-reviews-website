def merge_sort(elements):
    """Algoritmo per ordinare i film in base al voto"""
    if len(elements) > 1:
        # fase 1: splitting
        mid = len(elements) // 2
        left = elements[:mid]
        right = elements[mid:]
        merge_sort(left)
        merge_sort(right)

        # fase 2: merging
        a = b = c = 0
        while a < len(left) and b < len(right):
            # Se il film non ha nessun voto => Considera 0 => in fondo alla lista
            if left[a]['media'] == None:
                left[a]['media'] = 0
            if right[b]['media'] == None:
                right[b]['media'] = 0

            if left[a]['media'] < right[b]['media']:
                elements[c] = left[a]
                a += 1
            else:
                elements[c] = right[b]
                b += 1
            c += 1

        while a < len(left):
            elements[c] = left[a]
            a += 1
            c += 1

        while b < len(right):
            elements[c] = right[b]
            b += 1
            c += 1

    return elements