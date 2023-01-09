from django.contrib.sitemaps import Sitemap
from django.shortcuts import reverse
from sketches.views import pages as sketch_pages

class StaticViewSitemap(Sitemap):
    changefreq = "never"
    def items(self):
        return [page[2] for page in sketch_pages]
    def location(self, item):
        return reverse(item)