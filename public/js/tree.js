
(function () {

  var current;
  var currentRoot;
  var intCount = 1;
  var ciCount = 1;

  var cartridges;

/* global $ */
// haha such as hack.
  $.get('https://gist.githubusercontent.com/kramos/ae04ccbb542ca7661b5568ae44c9f76f/raw/cartridges.yml')
    .done(function (data) {
      cartridges = jsyaml.load(data);
      var jsonString = JSON.stringify(data);
    });

  var json =
    {
      'name': 'Production_Pipeline',
      'children': [],
      'url': 'https://github.com/sham126/adop-cartridge-production.git',
      'type': 'int',
      'desc': 'Production Pipeline cartridge'
    };

  var width = 700;
  var height = 650;
  var maxLabel = 160;
  var duration = 800;
  var radius = 20;

  var i = 0;
  var root;

  var tree = d3.layout.tree()
    .size([height, width]);

  var diagonal = d3.svg.diagonal()
    .projection(function (d) { return [d.y, d.x]; });

  var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + maxLabel + ',0)');

  root = json;
  root.x0 = height / 2;
  root.y0 = 0;

  function update (source) {
    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse();
    var links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) { d.y = d.depth * maxLabel; });

    // Update the nodes�
    var node = svg.selectAll('g.node')
        .data(nodes, function (d) {
          return d.id || (d.id = ++i);
        });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', function (d) { return 'translate(' + source.y0 + ',' + source.x0 + ')'; })
        .on('click', click);

    nodeEnter.append('circle')
        .attr('r', 0)
        .style('fill', function (d) {
          return d._children ? 'lightsteelblue' : 'white';
        });

    nodeEnter.append('text')
        .attr('x', function (d) {
          var spacing = computeRadius(d) + 5;
          return d.children || d._children ? -spacing : spacing;
        })
        .attr('dy', '3')
        .attr('text-anchor', function (d) { return d.children || d._children ? 'end' : 'start'; })
        .text(function (d) { return d.name; })
        .style('fill-opacity', 0);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr('transform', function (d) { return 'translate(' + d.y + ',' + d.x + ')'; });

    nodeUpdate.select('circle')
        .attr('r', function (d) { return computeRadius(d); })
        .style('fill', function (d) { return d._children ? 'lightsteelblue' : '#fff'; });

    var n = nodeUpdate.select('text').style('fill-opacity', 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr('transform', function (d) { return 'translate(' + source.y + ',' + source.x + ')'; })
        .remove();

    nodeExit.select('circle').attr('r', 0);
    nodeExit.select('text').style('fill-opacity', 0);

    // Update the links�
    var link = svg.selectAll('path.link')
        .data(links, function (d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', function (d) {
          var o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr('d', diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr('d', function (d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  function computeRadius (d) {
    if (d.children || d._children) return radius + (radius * nbEndNodes(d) / 10);
    else return radius;
  }

  function nbEndNodes (n) {
    nb = 0;
    if (n.children) {
      n.children.forEach(function (c) {
        nb += nbEndNodes(c);
      });
    } else if (n._children) {
      n._children.forEach(function (c) {
        nb += nbEndNodes(c);
      });
    } else nb++;

    return nb;
  }

  function click (d) {

    current = d;
    currentRoot = root;

    if (current.type === 'int') {
      $('#manageComponant').dialog({modal: true});
    } else {
      l = $.map(cartridges, function (v, k) { return k; });
      $('#cartridges').empty();
      for (var i in l) {
        $('#cartridges').append('<option value="' + l[i] + '">' + l[i] + '</option>');
      }

      $('#manageCIPipeline').dialog({modal: true});

      $('#setCartridge').click(function () {
        current.name = cartridges[$('#cartridges').val()].name.replace(/ /g, '_');
        current.url = cartridges[$('#cartridges').val()].url;

        update(currentRoot);
        current = undefined;

        $('#manageCIPipeline').dialog('close');
      });
    }

    $('#AddChild').click(function () {

      if (current.type === 'int') {

        if (current.children === undefined) {
          current.children = [];
        }

        var pipelineType;

        if (current.name === 'Production_Pipeline') {
          pipelineType = 'Production_Pipeline';
        } else if (current.type === 'int') {
          pipelineType = current.name;
        } else {
          pipelineType = 'Application_Pipeline';
        }

        current.children.push({
          'name': 'CI' + (ciCount++),
          'children': [
          ],
          'url': 'https://github.com/kramos/adop-cartridge-ci-starter.git',
          'parent': '',
          'decs': 'This is a CI pipeline.',
          'type': 'ci',
          'downstream_folder': pipelineType
        });

        update(current);
        current = undefined;
      } else {
        alert('You can only add children to integration builds.');
      }
      $('#manageComponant').dialog('close');
    });

    $('#AddIntegration').click(function () {

      if (current.type === 'int') {

        if (current.children === undefined) {
          current.children = [];
        }

        var pipelineType;

        if (current.name === 'Production_Pipeline') {
          pipelineType = 'Production_Pipeline';
        } else if (current.type === 'int') {
          pipelineType = current.name;
        } else {
          pipelineType = 'Application_Pipeline';
        }

        current.children.push({
          'name': 'Integration' + (intCount++),
          'children': [
          ],
          'url': 'https://github.com/kramos/adop-cartridge-integration.git',
          'parent': '',
          'type': 'int',
          'desc': 'This is in an integration pipeline.',
          'downstream_folder': pipelineType
        });

        update(currentRoot);
        current = undefined;
      }
      $('#manageComponant').dialog('close');
    });

    $('#delete').click(function () {
      current.children = [];
      update(current);
    });

  }

  $('#btnGenerate').click(function () {

    var cartridgeCollection = {
      'name': $('#projectName').val(),
      'cartridges': []
    };

    var queue = [];

    queue.push(root);

    var active = true;

    while (active === true) {

      var c = queue.pop();
      try {
        for (i in c.children) {
          queue.push(c.children[i]);
        }

      } catch (err) {}

      if (c !== undefined) {

        cartridgeCollection.cartridges.push({
          'folder': {
            'name': c.name,
            'display_name': c.name,
            'description': c.name
          },
          'cartridge': {
            'url': c.url,
            'desc': c.desc,
            'downstream_folder': c.downstream_folder
          }
        });

      }

      if (queue.length <= 0) {
        active = false;
      }
    }

    var gistName = 'cartridge_collection.json'
    var gistDesciption = 'ADOP Cartridge Collection: ' + $('#projectName').val()
    var payload = {
      data: cartridgeCollection
    };

    gist.create(
      gistName,
      gistDesciption,
      JSON.stringify(payload),
      function(success) {
        var gistUrl = gist.getGistUrl(success);
        $('#alert').empty();
        $('#alert').show();
        $('#alert').append("Your cartridge collection Gist: <a href='" + gistUrl + "'>" + gistUrl + '</a>');
        setTimeout(function () { $('#alert').hide(); }, 10000);
      },
      function(error) {
          // handle error 
          console.warn('gist save error', error);
      });
  });

  update(root);

})();

$('#generate').dialog({modal: false});
