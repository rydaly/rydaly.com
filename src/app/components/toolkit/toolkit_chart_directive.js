'use strict';
/* global d3 */

angular.module('rydaly')
  .directive('rdToolkitChart', function(ToolkitEventService, $window, $timeout) {

    function toolkitChartLink(scope) {
      scope.handleEventBroadcast = function(msg, data) {
        switch (msg) {
          case 'initd3':
            initD3(data);
            explodeD3();
            break;

          case 'explode':
            explodeD3();
            break;
        }
      };
    }

    var link,
      node,
      nodeEnter,
      circs,
      labels,
      root,
      rootSvg,
      force,
      vis,
      labelPadding = 10,
      baseRadius = 6;
    // explodeBtn = document.getElementById('explode');

    var initD3 = function(data) {
      force = d3.layout.force()
        .on("tick", tick)
        .gravity(0.175)
        .chargeDistance(600)
        .charge(function(d) {
          return d._children ? -d.size / 25 : -600;
        })
        .linkStrength(0.25)
        .linkDistance(function(d) {
          return d.target._children ? 100 : 50;
        });

      vis = d3.select("section.toolkit-container").append("svg:svg");
      link = vis.selectAll("line.link");
      node = vis.selectAll("g.node");
      circs = vis.selectAll("circle");
      root = data;

      updateD3();
      resizeD3();

      d3.select(window).on("resize", resizeD3);

      $timeout(function() {
        collapseD3();
        d3.select(".toolkit-container svg")
          .transition()
          .duration(500)
          .style("opacity", 1);
      }, 500);
    }

    var explodeD3 = function() {
      if (root.children) {
        for (var i = 0; i < root.children.length; i++) {
          // console.log(root.children[i]);
          toggleAll(root.children[i]);
        }
      }
    }

    var collapseD3 = function() {
      if (root.children) {
        for (var i = 0; i < root.children.length; i++) {
          // console.log(root.children[i]);
          toggleAll(root.children[i]);
        }
      }
    }

    var resizeD3 = function() {
      var width = $window.innerWidth,
        height = $window.innerHeight;
      vis.attr("width", width).attr("height", height);
      force.size([width, height])
        .chargeDistance(width / 2)
        .resume();
    }

    var updateD3 = function() {
      var nodes = flatten(root),
        links = d3.layout.tree().links(nodes);

      // Restart the force layout.
      force
        .nodes(nodes)
        .links(links)
        .start();

      // Update the links…
      link = link.data(links, function(d) {
        return d.target.id;
      });

      // Exit any old links.
      link.exit().remove();

      // Enter any new links.
      link.enter().insert("svg:line", "g.node")
        .attr("class", "link")
        .attr("x1", function(d) {
          return d.source.x;
        })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });

      // Update the nodes…
      node = node.data(nodes, function(d) {
        return d.id;
      });

      nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
        .style("cursor", "pointer")
        .call(force.drag);

      nodeEnter.append("svg:circle")
        // .attr("r", function(d) { return d.children ? 5 : Math.sqrt(d.size) / 10; })
        .attr("class", function(d) {
          return d.class ? d.class : "";
        })
        .on("click", click);
      // .attr("cx", function(d) { return d.x; })
      // .attr("cy", function(d) { return d.y; });

      circs = vis.selectAll("circle")
        .style("fill", color)
        .transition()
        .attr("r", function(d) {
          return d.children ? baseRadius + d.children.length : Math.sqrt(d.size) / baseRadius;
        });

      rootSvg = nodeEnter.append("svg:image")
        .attr("xlink:href", function(d) {
          return d.img ? d.img : null;
        })
        .attr("class", "img")
        .style("pointer-events", "none")
        .attr("x", function() {
          return -30;
        })
        .attr("y", function() {
          return -30;
        })
        .attr("width", 60)
        .attr("height", 60);

      // remove empty image tags since only the root should have it
      rootSvg.filter(function(d) {
        return d.img === null;
      }).remove();

      nodeEnter.append("svg:text")
        .attr("class", "node-label")
        .attr("text-anchor", "middle")
        // .attr("dx", 0)
        .text(function(d) {
          return d.name;
        });

      labels = vis.selectAll(".node-label")
        .transition()
        .attr("dy", function(d) {
          var rad = Math.sqrt(d.size) / baseRadius;
          return d.children ? -baseRadius - labelPadding : -rad - labelPadding;
        });

      // Exit any old nodes.
      node.exit().remove();
    }

    var toggleAll = function(d) {
      if (d.children) {
        for (var i = 0; i < d.children.length; i++) {
          toggleAll(d.children[i]);
        }
        toggle(d);
        updateD3();
      } else if (d._children) {
        for (var j = 0; j < d._children.length; j++) {
          toggleAll(d._children[j]);
        }
        toggle(d);
        updateD3();
      }
    }

    // Toggle children.
    var toggle = function(d) {
      var rootNode, isImg;
      if (d3.event) {
        // console.log('root clicked');
        rootNode = d3.select(d3.event.target);
        isImg = rootNode.classed("root");
        if (isImg) {
          rootNode.classed("solo", true);
        }
      }

      // set all circles not clicked | resets color
      d3.selectAll("circle")
        .classed("clicked", false);

      if (d.children) {
        d._children = d.children;
        d.children = null;
        if (rootNode && isImg) rootNode.classed("solo", true);
      } else {
        // add class to clicked and change color
        if (d3.event) {
          d3.select(d3.event.target).classed("clicked", true);
        }
        d.children = d._children;
        d._children = null;
        if (rootNode && isImg) rootNode.classed("solo", false);
      }
    }

    var tick = function() {
      link.attr("x1", function(d) {
          return d.source.x;
        })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });

      vis.selectAll("g.node")
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      // vis.selectAll("circle")
      //     .attr("cx", function (d) { return d.x; })
      //     .attr("cy", function (d) { return d.y; });

      // vis.selectAll(".node-label")
      //     .attr("x", function (d) { return d.x; })
      //     .attr("y", function (d) { return d.y; });

      vis.selectAll("g.node").each(collide(0.5));
      // vis.selectAll(".node-label").each(collide(0.5));
    }

    var padding = 25, // separation between circles
      radius = 20;

    var collide = function(alpha) {
      var quadtree = d3.geom.quadtree(flatten(root));
      return function(d) {
        var rb = 2 * radius + padding,
          nx1 = d.x - rb,
          nx2 = d.x + rb,
          ny1 = d.y - rb,
          ny2 = d.y + rb;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y);
            if (l < rb) {
              l = (l - rb) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }

    var color = function(d) {
      // green, blue, red
      return d._children ? "#6b8f38" : d.children ? "#4a5b63" : "#CC675B";
    }

    // Toggle children on click.
    var click = function(d) {
      if (!d3.event.defaultPrevented) {
        toggle(d);
        updateD3();
      }
    }

    // Returns a list of all nodes under the root.
    var flatten = function(root) {
      var nodes = [],
        i = 0;

      function recurse(node) {
        if (node.children) node.size = node.children.reduce(function(p, v) {
          return p + recurse(v);
        }, 0);
        if (!node.id) node.id = ++i;
        nodes.push(node);
        return node.size;
      }

      root.size = recurse(root);
      return nodes;
    }

    return {
      replace: false,
      restrict: 'E',
      link: toolkitChartLink,
      controller: 'ToolkitChartController',
      controllerAs: 'toolkitChartCtrl'
    };
  });
