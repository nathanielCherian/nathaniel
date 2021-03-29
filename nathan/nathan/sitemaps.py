from django.contrib.sitemaps import Sitemap
from django.shortcuts import reverse

class StaticViewSitemap(Sitemap):
    def items(self):
        return ['portfolio', 'about_me', 'sketch-index', 'kid_cudi_motm2', 'chaos', 'starry-night',
        'marbles', 'rush-hour', 'tetris'
        ]
    def location(self, item):
        return reverse(item)